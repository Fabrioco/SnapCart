import prisma from "../prismaClient/prismaClient";

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const createUser = (name: string, email: string, password: string) => {
  return prisma.user.create({
    data: { name, email, password },
  });
};
