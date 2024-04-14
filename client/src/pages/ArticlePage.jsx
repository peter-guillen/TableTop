import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import {
  fetchArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../api/articleApi";
import ArticleDetails from "../components/articles/ArticleDetails";
import ArticleList from "../components/articles/ArticleList";
import ArticleCreate from "../components/articles/ArticleCreate";
import ArticleEdit from "../components/articles/ArticleEdit";
import Button from "../components/Button";
import { ArticleContext } from "../contexts/ArticleContext";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const ArticlePage = () => {
  const [articleList, setArticleList] = useState([]);
  const { articles, setArticles } = useContext(ArticleContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const articles = await fetchArticles();
  //     setArticleList(articles);
  //   };
  //   fetchData();
  // }, []);

  console.log(articles);
  console.log(articleList);

  const handleCreate = async (formData) => {
    try {
      const newArticle = await createArticle(formData);
      setArticleList([...articleList, newArticle]);
    } catch (error) {
      console.log("Error creating article: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      const updatedArticleList = articleList.filter(
        (article) => article._id !== id
      );
      setArticleList(updatedArticleList);
    } catch (error) {
      console.log("Error deleteing article: ", error);
    }
  };

  const handleEdit = async (id, formData) => {
    try {
      await updateArticle(id, formData);
      const updatedArticleList = articleList.map((article) =>
        article._id === id ? { ...article, ...formData } : article
      );
      setArticleList(updatedArticleList);
    } catch (error) {
      console.log("Error updating Article", error);
    }
  };

  return (
    <>
      <div className="p-5 m-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A eius omnis
        inventore numquam ex est quasi temporibus aperiam minus vitae?
        Laboriosam animi iure molestias repudiandae doloribus ipsum recusandae
        odit incidunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Totam, quod! Necessitatibus sapiente modi dolorum, ex sequi fuga quo
        itaque quae, corporis consequuntur illo error aliquam ad enim eius
        quidem corrupti.
      </div>
      <Routes>
        {/* <Route
          path="/"
          element={
            <ArticleList articleList={articleList} onDelete={handleDelete} />
          }
        /> */}
        <Route
          path="/"
          element={
            <ArticleList articlesList={articles} onDelete={handleDelete} />
          }
        />
        <Route
          path="/createArticle"
          element={<ArticleCreate onCreate={handleCreate} />}
        />
        <Route
          path="/:id"
          element={<ArticleDetails articleList={articleList} />}
        />
        <Route
          path="/:id/edit"
          element={
            <ArticleEdit articleList={articleList} onEdit={handleEdit} />
          }
        />
      </Routes>
    </>
  );
};

export default ArticlePage;

// const ArticlePage = () => {
//   const [articleList, setArticleList] = useState([]);
//   const [hoveredArticleId, setHoveredArticleId] = useState(null);

//   const newsFeedContainerStyles = twMerge(
//     classNames("p-5 m-5 border-2 rounded-md grid grid-cols-3 gap-4")
//   );

//   const newsFeedItemStyles = (articleId) =>
//     twMerge(
//       classNames(
//         "text-white border-2 rounded-md bg-indigo-800 h-40 text-center",
//         {
//           "bg-indigo-400": hoveredArticleId === articleId,
//         }
//       )
//     );

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = async () => {
//     const response = await fetch("http://localhost:1234/api/articles");
//     const jsonResponse = await response.json();
//     setArticleList(jsonResponse);
//   };

//   const handleMouseEnter = (articleId) => {
//     setHoveredArticleId(articleId);
//   };
//   const handleMouseLeave = () => {
//     setHoveredArticleId(null);
//   };

//   //   const renderedArticle = articleList.map((article) => {
//   //     const articleDate = new Date(article.createdAt);
//   //     const month = articleDate.getMonth();
//   //     const year = articleDate.getFullYear();
//   //     return (
//   //       <div
//   //         key={article._id}
//   //         className={newsFeedItemStyles(article._id)}
//   //         onMouseEnter={() => handleMouseEnter(article._id)}
//   //         onMouseLeave={() => handleMouseLeave(null)}
//   //       >
//   //         <div>{article.title}</div>
//   //         <div>{article.body}</div>
//   //         <div>{`0${month} - ${year}`}</div>

//   //         {article.comments.map((comment) => {
//   //           const commentDate = new Date(comment.date);
//   //           const month = commentDate.getMonth();
//   //           const year = commentDate.getFullYear();

//   //           return (
//   //             <div key={comment._id}>
//   //               <div>{comment.author}</div>
//   //               <div>{comment.body}</div>
//   //               <div>{`0${month} - ${year}`}</div>
//   //             </div>
//   //           );
//   //         })}
//   //       </div>
//   //     );
//   //   });
//   <Routes>
//     <Route path="/:id" element={<ArticleDetails articleList={articleList} />} />
//   </Routes>;

//   const articleData = articleList.map((article, index) => {
//     return (
//       <>
//         <Link to={`/articles/${article._id}`}>
//           <div>
//             INSIDE DATA -{article.title} - {index}
//           </div>
//         </Link>
//       </>
//     );
//   });

//   console.log(articleData);

//   return (
//     <Link>
//       <div>OUTSIDE DATA - {articleData}</div>
//     </Link>
//   );
// };

// export default ArticlePage;
