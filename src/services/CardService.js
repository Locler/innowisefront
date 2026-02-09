import * as api from '../api/cards';

class CardService {

    getMyCards(userId) {
        return api.getMyCards(userId);
    }

    createCard(userId, card) {
        return api.createCard(userId, card);
    }

    updateCard(cardId, card) {
        return api.updateCard(cardId, card);
    }
}

export default new CardService();
