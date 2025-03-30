

export const formataData = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour12: false, 
    });
};

