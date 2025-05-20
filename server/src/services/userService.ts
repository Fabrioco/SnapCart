import prisma from "../prismaClient/prismaClient";
import bcrypt from "bcrypt";

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const findUser = await prisma.user.findMany({ where: { email } });
  if (findUser) {
    throw new Error("Email já cadastrado");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  
  return prisma.user.create({
    data: { name, email, password: hashPassword },
  });
};
