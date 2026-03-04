const { Credit, User } = require('../database/models');
const Boom = require('@hapi/boom');
const { sendNewCreditEmail } = require('../services/emailService');

// Crear un nuevo crédito
const createCredit = async (req, res, next) => {
  try {
    const {
      clientName,
      identificationId,
      loanAmount,
      interestRate,
      termMonths
    } = req.body;

    // Obtener el usuario autenticado del middleware
    const userId = req.user.id;

    // Crear el crédito
    const credit = await Credit.create({
      clientName,
      identificationId,
      loanAmount,
      interestRate,
      termMonths,
      userId
    });

    // Obtener el nombre del comercial (usuario autenticado)
    const commercialName = req.user.name;

    // Preparar datos para el correo
    const emailData = {
      clientName: credit.clientName,
      loanAmount: credit.loanAmount,
      commercialName: commercialName,
      identificationId: credit.identificationId,
      interestRate: credit.interestRate,
      termMonths: credit.termMonths
    };

    // Enviar correo electrónico
    const emailResult = await sendNewCreditEmail("fyasocialcapital@gmail.com", emailData);

    if (!emailResult.success) {
      console.warn('⚠️  Crédito creado pero el correo no pudo enviarse:', emailResult.error);
    }

    // Responder con éxito
    return res.status(201).json({
      success: true,
      message: 'Crédito creado exitosamente',
      data: {
        credit: {
          id: credit.id,
          clientName: credit.clientName,
          identificationId: credit.identificationId,
          loanAmount: credit.loanAmount,
          interestRate: credit.interestRate,
          termMonths: credit.termMonths,
          createdAt: credit.createdAt,
          user: {
            id: req.user.id,
            name: commercialName,
            email: req.user.email
          }
        },
        emailSent: emailResult.success
      }
    });

  } catch (error) {
    next(error);
  }
};

// Obtener todos los créditos del usuario autenticado
const getCredits = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const credits = await Credit.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
    });

    return res.status(200).json({
      success: true,
      data: {
        credits,
        total: credits.length
      }
    });

  } catch (error) {
    next(error);
  }
};

// Obtener un crédito por ID
const getCreditById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const credit = await Credit.findOne({
      where: { id, userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
    });

    if (!credit) {
      throw Boom.notFound('Crédito no encontrado');
    }

    return res.status(200).json({
      success: true,
      data: { credit }
    });

  } catch (error) {
    next(error);
  }
};

// Actualizar un crédito
const updateCredit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const {
      clientName,
      identificationId,
      loanAmount,
      interestRate,
      termMonths
    } = req.body;

    const credit = await Credit.findOne({
      where: { id, userId }
    });

    if (!credit) {
      throw Boom.notFound('Crédito no encontrado');
    }

    // Actualizar crédito
    await credit.update({
      clientName: clientName || credit.clientName,
      identificationId: identificationId || credit.identificationId,
      loanAmount: loanAmount || credit.loanAmount,
      interestRate: interestRate || credit.interestRate,
      termMonths: termMonths || credit.termMonths
    });

    return res.status(200).json({
      success: true,
      message: 'Crédito actualizado exitosamente',
      data: { credit }
    });

  } catch (error) {
    next(error);
  }
};

// Eliminar un crédito (soft delete)
const deleteCredit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const credit = await Credit.findOne({
      where: { id, userId }
    });

    if (!credit) {
      throw Boom.notFound('Crédito no encontrado');
    }

    await credit.destroy(); // Soft delete por paranoid: true

    return res.status(200).json({
      success: true,
      message: 'Crédito eliminado exitosamente'
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCredit,
  getCredits,
  getCreditById,
  updateCredit,
  deleteCredit,
};
