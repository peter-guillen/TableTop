import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./article.model.js", () => ({
  default: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

vi.mock("../../shared/utils/logger.js", () => ({
  logAction: vi.fn(),
}));

import Article from "./article.model.js";
import { logAction } from "../../shared/utils/logger.js";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "./article.service.js";

const mockArticle = {
  _id: "article123",
  title: "Patch notes",
  synopsis: "What changed this week.",
};

const mockUserId = "user456";

beforeEach(() => vi.clearAllMocks());

describe("getAllArticles", () => {
  it("returns all articles", async () => {
    Article.find.mockReturnValue({
      lean: vi.fn().mockResolvedValue([mockArticle]),
    });

    const result = await getAllArticles();

    expect(result).toEqual([mockArticle]);
    expect(Article.find).toHaveBeenCalledWith({});
  });
});

describe("getArticleById", () => {
  it("returns a article when found", async () => {
    Article.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockArticle),
    });

    const result = await getArticleById("article123");

    expect(result).toEqual(mockArticle);
    expect(Article.findById).toHaveBeenCalledWith("article123");
  });

  it("returns null when the article does not exist", async () => {
    Article.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await getArticleById("nonexistent");

    expect(result).toBeNull();
  });
});

describe("createArticle", () => {
  it("creates a article, logs the action, and returns it", async () => {
    const created = {
      ...mockArticle,
      toObject: vi.fn().mockReturnValue(mockArticle),
    };
    Article.create.mockResolvedValue(created);

    const result = await createArticle(mockArticle, mockUserId);

    expect(Article.create).toHaveBeenCalledWith(mockArticle);
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Created Article",
      target: "Article",
      targetId: mockArticle._id,
      metadata: { before: null, after: mockArticle },
    });
    expect(result).toEqual(created);
  });
});

describe("updateArticle", () => {
  it("updates with validators on, logs before and after, and returns the updated article", async () => {
    const updated = { ...mockArticle, title: "Patch notes v2" };
    Article.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockArticle),
    });
    Article.findByIdAndUpdate.mockReturnValue({
      lean: vi.fn().mockResolvedValue(updated),
    });

    const result = await updateArticle(
      "article123",
      { title: "Patch notes v2" },
      mockUserId,
    );

    expect(Article.findByIdAndUpdate).toHaveBeenCalledWith(
      "article123",
      { $set: { title: "Patch notes v2" } },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Updated Article",
      target: "Article",
      targetId: updated._id,
      metadata: { before: mockArticle, after: updated },
    });
    expect(result).toEqual(updated);
  });

  it("returns null without updating or logging when the article does not exist", async () => {
    Article.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await updateArticle(
      "nonexistent",
      { title: "Patch notes v2" },
      mockUserId,
    );

    expect(result).toBeNull();
    expect(Article.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("deleteArticle", () => {
  it("deletes a article, logs the action, and returns the deleted article", async () => {
    Article.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockArticle),
    });
    Article.findByIdAndDelete.mockResolvedValue();

    const result = await deleteArticle("article123", mockUserId);

    expect(Article.findByIdAndDelete).toHaveBeenCalledWith("article123");
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Deleted Article",
      target: "Article",
      targetId: mockArticle._id,
      metadata: { before: mockArticle, after: null },
    });
    expect(result).toEqual(mockArticle);
  });

  it("returns null without deleting or logging when the article does not exist", async () => {
    Article.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await deleteArticle("nonexistent", mockUserId);

    expect(result).toBeNull();
    expect(Article.findByIdAndDelete).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});
