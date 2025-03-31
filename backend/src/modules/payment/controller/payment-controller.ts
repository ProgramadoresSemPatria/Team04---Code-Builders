import { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
import { UserRepository } from '../../user/repository/user-repository';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class PaymentController {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const baseUrl =
        process.env.BASE_URL || req.headers.origin || 'http://localhost:3000';

      const userId = req.userId!;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/canceled`,
        metadata: {
          userId: userId.toString(),
        },
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      next(error);
    }
  }

  async verifyPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { session_id } = req.query;

      if (!session_id) {
        return res.status(400).json({ error: 'Session ID é obrigatório' });
      }

      const session = await stripe.checkout.sessions.retrieve(
        session_id as string,
        {
          expand: ['customer'],
        }
      );

      if (session.payment_status === 'paid') {
        const userId = session.metadata!.userId;

        await this.userRepository.update({
          id: Number(userId),
          isPaymentDone: true,
        });

        res.status(200).json({
          success: true,
          amount: session.amount_total,
          customer_email: session.customer_details?.email,
          userId: userId,
        });
      } else {
        res
          .status(402)
          .json({ success: false, status: session.payment_status });
      }
    } catch (error) {
      next(error);
    }
  }
}
