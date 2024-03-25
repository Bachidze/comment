import { useState } from "react";
import Commentari from "./Commentari";

const commentsArray = [
  {
    id: 1,
    title: "First Comment",
    replies: [
      {
        id: 1,
        title: "FirstReply",
      },
    ],
  },
  {
    id: 2,
    title: "Second Comment",
    replies: [],
  },
  {
    id: 3,
    title: "Third Comment",
    replies: [
      {
        id: 1,
        title: "FirstReply to Third Comment",
      },
    ],
  },
];

export default function Comments() {
  const [commnets, setComments] = useState(commentsArray);
  const [commentTitle, setCommentTitle] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lastId = commnets[commnets.length - 1].id;
    const newComment = {
      id: lastId + 1,
      title: commentTitle,
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
  };

  const hadnleDelete = (id:number) => {
    setComments(prev => prev.filter(el => el.id != id))
  }

  const handleEdit = (index:number,title:string) => {
    const copyComments = [...commnets]
    copyComments[index] = {...copyComments[index],title}
    setComments(copyComments)
  }

  const handleReply = (index:number,replyTitle:string) => {
    const copyComments = [...commnets]
    const lastId = copyComments[index].replies[copyComments[index].replies.length - 1]?.id || 0
    const newReply = {
        id:lastId - 1,
        title: replyTitle
    }
    copyComments[index].replies = [...copyComments[index].replies,newReply]
    setComments(copyComments)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Comment"
          value={commentTitle}
          onChange={(e) => setCommentTitle(e.target.value)}
        />
        <button>Add Comment</button>
      </form>
      {commnets.map((el,index) => (
        <Commentari 
        key={el.id}
        el={el}
        index={index}
        hadnleDelete={hadnleDelete}
        handleEdit={handleEdit}
        handleReply={handleReply}
        />
      ))}
      
    </>
  );
}
