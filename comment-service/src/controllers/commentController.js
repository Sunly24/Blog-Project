import commentModel from "../models/commentModel";

export const create = async (req, res) => {
  try {
    const commentData = new commentModel(req.body);
    const savedComment = await commentData.save();
    res.status(200).json({ message: "Comment created successfully", data: savedComment });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const fetch = async (req, res) => {
  try {
    const comments = await commentModel.find();
    if (comments.length === 0) {
      return res.status(404).json({ message: "Comment Not found" });
    }
    res.status(200).json({ message: "Comments fetched successfully", data: comments });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const commentExist = await commentModel.findById({ _id: id });
    if (!commentExist) {
      return res.status(404).json({ message: "Comment Not found" });
    }

    await commentModel.findByIdAndDelete({ _id: id });
    res.status(201).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}