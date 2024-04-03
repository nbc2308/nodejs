import Category from "../models/category";
import { StatusCodes } from "http-status-codes";

export const create = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    return res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const getAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không có sản phẩm nào" });
    }
    return res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    return res.status(StatusCodes.OK).json(category);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete(req.params.id);
    return res.status(StatusCodes.OK).json(category);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const updateCategoryById = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(StatusCodes.OK).json(category);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
