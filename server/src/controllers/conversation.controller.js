const { Conversation } = require('../models');
const { CustomException } = require('../utils');

const createConversation = async (request, response) => {
    const { to } = request.body;
    try {
        const conversation = new Conversation({
            id: request.isSeller ? request.userID + to : to + request.userID,
            sellerID: request.isSeller ? request.userID : to,
            buyerID: request.isSeller ? to : request.userID,
            readBySeller: request.isSeller,
            readByBuyer: !request.isSeller
        });

        await conversation.save();
        return response.status(201).send(conversation);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const getConversations = async (request, response) => {
    try {
        const conversation = await Conversation.find(request.isSeller ? { sellerID: request.userID } : { buyerID: request.userID });
        return response.send(conversation);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const getSingleConversation = async (request, response) => {
    const { conversationID } = request.params;
    try {
        const conversation = await Conversation.findOne({ conversationID })
        if (!conversation) {
            throw CustomException('No such conversation found!', 404);
        }
        return response.send(conversation);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const updateConversation = async (request, response) => {
    const { conversationID } = request.params;

    try {
        const conversation = await Conversation.findOneAndUpdate(conversationID, {
            $set: {
                readBySeller: request.isSeller,
                readByBuyer: !request.isSeller
            }
        }, { new: true });

        return response.send(conversation);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

module.exports = {
    createConversation,
    getConversations,
    getSingleConversation,
    updateConversation
}