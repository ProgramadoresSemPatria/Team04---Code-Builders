import { FormataReal } from '@/lib/FormataReal';
import { ArrowRight, BarChart3, Calendar, CheckCircle, Clock, Sparkles, Users } from 'lucide-react'

import { Link } from 'react-router-dom'



const Planos = [
	{
		id : 1,
		title : 'Premium',
		subtitle : 'Para Freelancers desde iniciante até o expert.',
		preco : 79.90,
		itens : [
			{title : 'Cadastro de clientes'},
			{title : 'Cadastro de projetos'},
			{title : 'Controle básico de tempo'},
			{title : 'Dashboard básico'},
			{title : 'Suporte prioritário'},
			{title : 'Suporte por email'},
		],	
	},
]










export const Home = () => {


  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    if(id === '/'){
      window.scrollTo({ top: 0, behavior: "smooth" });
    }


  };
  

  return (
    <div className="flex min-h-screen flex-col">
		
		<header className="sticky top-0 z-50 w-full border-b border-transparent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/100">
			<div className="w-full flex h-16 items-center justify-between py-10 px-8">
				<div className="flex items-center gap-2 font-bold">
					<BarChart3 className="h-6 w-6 text-primary" />
					<span>FreelancerCRM</span>
				</div>
				<nav className="hidden gap-6 md:flex">
					<button  className="text-md font-bold transition-colors hover:text-primary cursor-pointer" onClick={() => scrollToSection("/")}>Home</button>
					<button  className="text-md font-bold transition-colors hover:text-primary cursor-pointer" onClick={() => scrollToSection("recursos")}>Recursos</button>
					<button  className="text-md font-bold transition-colors hover:text-primary cursor-pointer" onClick={() => scrollToSection("preco")}>Planos</button>
				</nav>
				<div className="flex items-center gap-4">
					<Link to="/signin" className='btn btn-sm cursor-pointer  hover:not-focus:bg-gray-200 rounded-md p-2  text-black font-bold px-2'>
							Login
						
					</Link>
					<Link to="/signup" className='btn btn-sm cursor-pointer rounded-md p-2 bg-black text-white font-bold'>
						Cadastrar
					</Link>
				</div>
			</div>
		</header>
		<section
			id="home"
			className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-700 text-white px-10 md:px-25"
		>

			<div className="w-full relative grid items-center gap-6 py-16 md:py-24 lg:grid-cols-1 lg:gap-12">
				<div className="flex max-w-[640px] flex-col items-start gap-4">
					<div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur">
						<Sparkles className="mr-2 h-3.5 w-3.5" />
						<span>A solução completa para freelancers</span>
					</div>
					<h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
						Gerencie seus projetos freelancer com facilidade
					</h1>
					<p className="text-lg text-white/80 md:text-xl">
						Organize clientes, projetos, prazos e pagamentos em um só lugar. Aumente sua produtividade e foque no que
						realmente importa.
					</p>
					<div className="flex flex-col gap-4 sm:flex-row btn btn-sm">
						<Link to="/signin">
							<button  className="gap-1.5 flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20">
							Começar agora
							<ArrowRight className="h-4 w-4 btn btn-sm" />
							</button>
						</Link>
						
						<button className="gap-1.5 flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
						onClick={() => scrollToSection("preco")}
						>
							Ver plano
						</button>
						
					</div>
				</div>
			
			</div>
			
		</section>

		
		<section className="w-full py-12 px-3">
			<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
				<h2 className="text-xl font-medium text-muted-foreground">
					Utilizado por freelancers e agências em todo o Brasil
				</h2>
				<div className="flex flex-wrap items-center justify-center gap-8">
				{["Empresa A", "Agência B", "Studio C", "Consultoria D", "Marca E"].map((company) => (
					<div key={company} className="text-2xl font-bold text-muted-foreground/50">
						{company}
					</div>
				))}
				</div>
			</div>
		</section>

		
		<section className="w-full py-16 md:py-24 px-4" id="recursos">
			<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
				<div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
					Recursos Poderosos
				</div>
				<h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
					Tudo o que você precisa em um só lugar
				</h2>
				<p className="max-w-[85%] text-muted-foreground sm:text-lg">
					Gerencie todo o seu trabalho freelancer com ferramentas intuitivas e poderosas
				</p>
			</div>
			<div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
				<div className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
					<div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:scale-150"></div>
					<div className="relative">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
							<Users className="h-6 w-6 text-primary" />
						</div>
						<h3 className="mb-2 text-xl font-bold">Gestão de Clientes</h3>
						<p className="text-muted-foreground">
							Cadastre e organize todos os seus clientes com informações detalhadas e histórico completo.
						</p>
						<ul className="mt-4 space-y-2">
							<li className="flex items-center text-sm text-muted-foreground">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>Cadastro completo de clientes</span>
							</li>
							<li className="flex items-center text-sm text-muted-foreground">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>Histórico de interações</span>
							</li>
							
						</ul>
					</div>
				</div>

				<div className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
					
						<div className="relative">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
								<Calendar className="h-6 w-6 text-primary" />
							</div>
							<h3 className="mb-2 text-xl font-bold">Projetos e Tarefas</h3>
							<p className="text-muted-foreground">
								Crie projetos  e acompanhe o progresso de cada trabalho em tempo real.
							</p>
							<ul className="mt-4 space-y-2">
								<li className="flex items-center text-sm text-muted-foreground">
									<CheckCircle className="mr-2 h-4 w-4 text-primary" />
									<span>Gerenciamento de projetos</span>
								</li>
								<li className="flex items-center text-sm text-muted-foreground">
									<CheckCircle className="mr-2 h-4 w-4 text-primary" />
									<span>Acompanhamento de horas</span>
								</li>
								
							</ul>
					</div>
				</div>
				<div className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
				
					<div className="relative">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
							<Clock className="h-6 w-6 text-primary" />
						</div>
						<h3 className="mb-2 text-xl font-bold">Controle de Tempo</h3>
						<p className="text-muted-foreground">
							Registre as horas trabalhadas em cada projeto e gere relatórios detalhados.
						</p>
						<ul className="mt-4 space-y-2">
							<li className="flex items-center text-sm text-muted-foreground">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>Inclusão de horas</span>
							</li>
							<li className="flex items-center text-sm text-muted-foreground">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>Relatórios por projeto</span>
							</li>
							
						</ul>
					</div>
				</div>
			</div>
		</section>

	
		<section className="bg-muted/50 py-16 md:py-20 px-4">
			<div className="w-full">
				<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
					<div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Como Funciona</div>
					<h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
						Simplifique seu fluxo de trabalho
					</h2>
					<p className="max-w-[85%] text-muted-foreground sm:text-lg">
						Três passos simples para transformar a gestão do seu negócio freelancer
					</p>
				</div>
				<div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
					<div className="flex flex-col items-center text-center">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
							1
						</div>
						<h3 className="mt-4 text-xl font-bold">Cadastre seus clientes</h3>
						<p className="mt-2 text-muted-foreground">
							Adicione informações detalhadas sobre seus clientes e mantenha tudo organizado.
						</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
							2
						</div>
						<h3 className="mt-4 text-xl font-bold">Crie seus projetos</h3>
						<p className="mt-2 text-muted-foreground">
							Defina projetos, estabeleça prazos e divida o trabalho em tarefas gerenciáveis.
						</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
							3
						</div>
						<h3 className="mt-4 text-xl font-bold">Acompanhe e fature</h3>
						<p className="mt-2 text-muted-foreground">
							Registre o tempo trabalhado, acompanhe o progresso.
						</p>
					</div>
				</div>
			</div>
		</section>

		
		<section className="w-full py-16 md:py-24 px-4">
			<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
				<div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Depoimentos</div>
				<h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">O que nossos usuários dizem</h2>
				<p className="max-w-[85%] text-muted-foreground sm:text-lg">
					Freelancers e agências que transformaram seus negócios com o FreelancerCRM
				</p>
			</div>
			<div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
				{[
				{
					name: "Ana Silva",
					role: "Designer Freelancer",
					quote:
					"O FreelancerCRM transformou completamente a forma como gerencio meus projetos. Economizo horas por semana em tarefas administrativas.",
					
				},
				{
					name: "Carlos Oliveira",
					role: "Desenvolvedor Web",
					quote:
					"Finalmente encontrei uma ferramenta que entende as necessidades de um freelancer. O controle de tempo e faturamento é simplesmente perfeito.",
					
				},
				{
					name: "Mariana Santos",
					role: "Agência de Marketing",
					quote:
					"Gerenciar múltiplos clientes e projetos nunca foi tão fácil. Nossa produtividade aumentou em 40% desde que começamos a usar o FreelancerCRM.",
					
				},
				].map((testimonial, index) => (
					<div key={index} className="flex flex-col rounded-2xl border bg-background p-8 shadow-sm">
						<div className="flex-1">
							<p className="text-lg italic text-muted-foreground">"{testimonial.quote}"</p>
						</div>
						<div className="mt-6 flex items-center gap-4">
							<div className="h-12 w-12 rounded-full object-cover bg-gray-100"
							/>
							<div>
								<h4 className="font-bold">{testimonial.name}</h4>
								<p className="text-sm text-muted-foreground">{testimonial.role}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>

	
		<section className="bg-gradient-to-br from-muted/50 via-muted/30 to-transparent py-16 md:py-24 px-4" id="preco">
			<div className="w-full">
				<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
					<div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
						Plano e Preço
					</div>
					<h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
						O plano ideal para você
					</h2>
					
				</div>
				<div className="mx-auto mt-16  flex justify-center">	
					{Planos.map((item) => (
						<div className="relative rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md" key={item.id}>
							{/* <div className="absolute -right-1 top-2 rounded-full bg-muted px-3 py-1 text-xs font-medium">Grátis</div> */}
							<h3 className="text-2xl font-bold">{item.title}</h3>
							<p className="mt-1 text-muted-foreground">{item.subtitle}</p>
							<div className="mt-6">
								<span className="text-4xl font-bold">R${FormataReal(item.preco)}</span>
								<span className="text-muted-foreground">/mês</span>
							</div>
							<ul className="mt-6 space-y-3">
								{item.itens.map((itemitens) => (
									<li className="flex items-center">
									<CheckCircle className="mr-2 h-5 w-5 text-primary" />
									<span>{itemitens.title}</span>
								</li>
								))}
								
							</ul>
							
						</div>
							
					))}		
				
				</div>
			</div>
		</section>


		<section className="w-full py-16 md:py-24 px-4">
			<div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-center text-white md:p-12">
				<h2 className="text-3xl font-bold md:text-4xl">Pronto para transformar seu negócio?</h2>
				<p className="mx-auto mt-4 max-w-lg text-white/80">
				Junte-se a milhares de freelancers que estão economizando tempo e aumentando sua produtividade com o
				FreelancerCRM.
				</p>
				<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">				
					<Link to="/signin">
						<button  className="gap-1.5 flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20">
						Começar agora
						<ArrowRight className="h-4 w-4 btn btn-sm" />
						</button>
					</Link>
						
				</div>
			</div>
		</section>

		<footer className="border-t bg-muted/30">
			<div className="w-full ">
				<div className="flex flex-col items-center justify-between gap-8 md:flex-row  py-12 px-10">
					<div className="flex flex-col items-center gap-2 md:items-start">
						<div className="flex items-center gap-2 font-bold">
							<BarChart3 className="h-6 w-6 text-primary" />
							<span>FreelancerCRM</span>
						</div>
						<p className="text-center text-sm text-muted-foreground md:text-left">
							A solução completa para freelancers e agências
						</p>
					</div>
					<div className="grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-8 lg:grid-cols-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-sm font-medium">Produto</h3>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Recursos
							</Link>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Planos
							</Link>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Roadmap
							</Link>
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="text-sm font-medium">Empresa</h3>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Sobre nós
							</Link>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Blog
							</Link>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Carreiras
							</Link>
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="text-sm font-medium">Suporte</h3>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Contato
							</Link>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Documentação
							</Link>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								FAQ
							</Link>
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="text-sm font-medium">Legal</h3>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Termos
							</Link>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Privacidade
							</Link>
							<Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
								Cookies
							</Link>
						</div>
					</div>
				</div>
				<div className="w-full mt-12 flex flex-col items-center justify-between gap-4 border-t border-muted p-8 md:flex-row">
					<p className="text-center text-sm text-muted-foreground md:text-left">
						&copy; {new Date().getFullYear()} FreelancerCRM. Todos os direitos reservados.
					</p>
					<div className="flex gap-4">
						<Link to="#" className="text-muted-foreground hover:text-foreground">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
							</svg>
						</Link>
						<Link to="#" className="text-muted-foreground hover:text-foreground">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
							</svg>
						</Link>
						<Link to="#" className="text-muted-foreground hover:text-foreground">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
								<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
								<line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
							</svg>
						</Link>
						<Link to="#" className="text-muted-foreground hover:text-foreground">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
								<rect width="4" height="12" x="2" y="9"></rect>
								<circle cx="4" cy="4" r="2"></circle>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</footer>
 	</div>
  )
}
