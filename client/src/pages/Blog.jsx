import React from "react";
import style from "../styles/pages/Blogs.module.css";
function Blog() {
  const Blogs = [
    {
      para: "Discover the world of fine jewellery, timeless traditions, and modern trends with Kaira Jewellers. Our blog is dedicated to sharing expert insights, style inspiration, care tips, and behind-the-scenes stories that bring you closer to the art of jewellery.",
    },
    {
      heading: "💎 The Timeless Appeal of Diamond Jewellery",
      para: "Diamonds are more than just precious stones — they are eternal symbols of elegance and love. In this article, we explore why diamonds continue to be the most desired gemstone across generations, how to choose the perfect cut, and tips for making them last forever.",
    },
    {
      heading: "✨ Gold Jewellery: A Blend of Tradition and Modernity",
      para: "From weddings to festivals, gold holds a sacred place in Indian culture. Learn about the evolution of gold jewellery designs, how to style them for modern outfits, and why gold remains a wise investment.",
    },
    {
      heading: "💍 A Guide to Caring for Your Jewellery",
      para: "Jewellery is a treasure — and with proper care, it lasts a lifetime. This guide shares essential tips for cleaning, storing, and protecting your jewellery, ensuring it shines bright for years to come.",
    },
    {
      heading: "🌟 Behind the Scenes: The Making of a Masterpiece",
      para: "At Kaira Jewellers, every creation tells a story. Get an exclusive glimpse into our design process — from sketching to crafting, and the meticulous artistry that makes each piece unique.",
    },
    {
      heading: "Why Follow Our Blog?",
      para: `✔ Stay updated with latest jewellery trends <br />
✔ Get styling tips for every occasion <br />
✔ Learn about jewellery care & authenticity <br />
✔ Explore the heritage & innovation of Kaira Jewellers
`,
    },
  ];

  const renderblogs = Blogs.map((Blogs, id) => {
    return (
      <div className={style.conditionSection} key={id}>
        <div className={style.text}>
          <h1>{Blogs.heading}</h1>
           <p dangerouslySetInnerHTML={{ __html: Blogs.para }}></p>
        </div>
      </div>
    );
  });

  return (
    <div className={style.termAndConditionCOntainer}>
      <div className={style.termsinnerContainer}>
        <h1>Welcome to the Kaira Jewellers Blog</h1>
        {renderblogs}
      </div>
    </div>
  );
}

export default Blog;
