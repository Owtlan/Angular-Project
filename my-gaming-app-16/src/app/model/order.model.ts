export interface Order {
    id?: string; // Идентификатор (може да бъде генериран)
    gameId: string; // Идентификатор на играта
    userId: string; // Идентификатор на потребителя
    street: string; // Улица
    phone: string; // Телефонен номер
    name: string; // Имена
    email: string; // Имейл адрес
    createdAt: Date; // Дата на създаване на поръчката
  }
  