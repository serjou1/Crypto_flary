const cards = [{
    _id: '1',
    active: true,
    bank: 'ACB',
    name: 'Nguyen Van A',
    cardNumber: '123456789',
    phoneNumber: '0123456789',
    status: 'active',
}, {
    _id: '2',
    active: false,
    bank: 'Vietcombank',
    name: 'Nguyen Van B',
    cardNumber: '987654321',
    phoneNumber: '0987654321',
    status: 'inactive',
}]

const formattedCards = cards.map(({
    _id: id,
    active,
    bank,
    name,
    cardNumber,
    phoneNumber,
    ..._
}) => ({
    id,
    active,
    bank,
    name,
    cardNumber,
    phoneNumber,
}));

console.log(formattedCards);