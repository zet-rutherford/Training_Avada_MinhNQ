const apiUrl = "https://jsonplaceholder.typicode.com";

const getData = async (url) => {
  try {
    const res = await fetch(`${apiUrl}/${url}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
//get all the posts and comments map with users array
const mergeData = async () => {
  try {
    const [users, posts, comments] = await Promise.all([
      getData("users"),
      getData("posts"),
      getData("comments"),
    ]);
    const userData = users.map((user) => {
      const userPosts = posts.filter((post) => post.userId === user.id);
      const listPosts = posts.map((post) => {
        const { userId, ...rest } = post;
        return rest;
      });
      const postComments = listPosts.map((post) => {
        const comment = comments.filter(
          (comment) => comment.postId === post.id
        );
        return comment;
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        posts: userPosts,
        comments: postComments,
      };
    });
    return userData;
  } catch (error) {
    console.log(error);
  }
};
//hien thi so luong comments va posts
const getCount = async () => {
  try {
    const userData = await mergeData();
    return (resUser = userData
      .filter((user) => user.comments.length > 3)
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        postsCount: user.posts.length,
        commentsCount: user.comments.length,
      })));
  } catch (error) {
    console.log(error);
  }
};
//tim nguoi tuong tac nhieu nhat
const findMostActivities = async () => {
  try {
    const userData = await mergeData();
    const mostActiveUser = userData.reduce((acc, userData) => {
      return userData.posts.length + userData.comments.length >
        acc.posts.length + acc.comments.length
        ? userData
        : acc;
    }, userData[0]);
    return mostActiveUser;
  } catch (error) {
    console.log(error);
  }
};
//sap xep postCount theo thu tu giam dan
const sortUser = async () => {
  try {
    const userData = await getCount();
    users.sort((a, b) => b.postsCount - a.postsCount);
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};
//merge post and comments follow the format
const mergePostsAndComments = async () => {
  try {
    const post = await getData("posts");
    const comments = await getData("comments");
    const postWithComments = post.map((post) => {
      const comment = comments.filter((comment) => comment.postId === post.id);
      return {
        ...post,
        comments: comment,
      };
    });
    console.log(postWithComments);
  } catch (err) {
    console.error(err);
  }
};

const getResult = async () => {
  try {
    // const bai3 = await mergeData();
    // console.log(bai3[0]);
    // const bai4 = await getCount();
    // console.log(bai4);
    // const bai5 = await findMostActivities();
    // console.log(bai5);
    // const bai7 = await sortUser();
    // console.log(bai7);
    await mergePostsAndComments();
  } catch (error) {
    console.log(error);
  }
};

getResult();
