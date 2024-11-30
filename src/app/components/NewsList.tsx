// // src/app/components/NewsList.tsx
// import React from "react";
// import Image from "next/image";

// interface NewsListProps {
//   title: string;
//   description: string;
//   imageUrl: string;
//   newsUrl: string;
// }

// const NewsList: React.FC<NewsListProps> = ({
//   title,
//   description,
//   imageUrl,
//   newsUrl,
// }) => {
//   return (
//     <div className="card" style={{ width: "18rem", margin: "1rem" }}>
//       <Image
//         src={imageUrl}
//         alt={title}
//         className="card-img-top"
//         width={300}
//         height={200}
//       />
//       <div className="card-body">
//         <h5 className="card-title">{title}</h5>
//         <p className="card-text">{description}...</p>
//         <a
//           href={newsUrl}
//           target="_blank"
//           rel="noreferrer"
//           className="btn btn-sm btn-primary"
//         >
//           Read More
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NewsList;
