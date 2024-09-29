"use server";

import { revalidatePath } from "next/cache";

import prisma from '../db';

import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
    try {
      const newUser = await prisma.user.create({
        data:user,
      });
  
      return newUser; // No need to stringify/parse with Prisma
    } catch (error) {
      handleError(error);
    }
  }

// READ
export async function getUserById(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
      });
  
      if (!user) throw new Error("User not found");
  
      return user; // No need to stringify/parse with Prisma
    } catch (error) {
      handleError(error);
    }
  }


// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
      const updatedUser = await prisma.user.update({
        where: { clerkId },
        data: user,
      });
  
      if (!updatedUser) throw new Error("User update failed");
  
      return updatedUser; // No need to stringify/parse with Prisma
    } catch (error) {
      handleError(error);
    }
  }

// DELETE
export async function deleteUser(clerkId: string) {
    try {
      // Find user to delete
      const userToDelete = await prisma.user.findUnique({
        where: { clerkId },
      });
  
      if (!userToDelete) {
        throw new Error("User not found");
      }
  
      // Delete user
      const deletedUser = await prisma.user.delete({
        where: { clerkId },
      });
      
      revalidatePath("/");
  
      return deletedUser; // No need to stringify/parse with Prisma
    } catch (error) {
      handleError(error);
    }
  }


// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
    try {
      const updatedUserCredits = await prisma.user.update({
        where: { id: userId },
        data: { creditBalance: { increment: creditFee } },
      });
  
      if (!updatedUserCredits) throw new Error("User credits update failed");
  
      return updatedUserCredits; // No need to stringify/parse with Prisma
    } catch (error) {
      handleError(error);
    }
  }
