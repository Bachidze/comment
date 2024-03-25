import { useState } from "react";

type PropType = {
  el: {
    id: number;
    title: string;
    replies: {
      id: number;
      title: string;
    }[];
  };
  index: number;
  hadnleDelete: (id: number) => void;
  handleEdit: (index: number, title: string) => void
  handleReply: (index: number, replyTitle: string) => void
};
export default function Commentari({ el, index, hadnleDelete,handleEdit,handleReply }: PropType) {
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle,setEditTitle] = useState(el.title)
  const [isReply,setIsReply] = useState(false)
  const [replyTxt,setReplyTxt] = useState('')
  return (
    <>
      {isEdit ? (
        <div>
          <input type="text" value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} />
          <button onClick={() =>{
            handleEdit(index,editTitle)
            setIsEdit(false)
          }}>Save</button>
          <button onClick={() => setIsEdit(false)}>Cancel</button>
        </div>
      ) : (
        <div key={el.id}>
          <h2>{el.id}</h2>
          <h2>{el.title}</h2>
          <button onClick={() => setIsEdit(true)}>Edit</button>
          <button onClick={() => hadnleDelete(el.id)}>Delete</button>
          <button onClick={() => setIsReply(true)}>Reply</button>
        </div>
      )}
      {isReply && 
      <div>
        <input type="text" value={replyTxt} onChange={(e) => setReplyTxt(e.target.value)} />
        <button onClick={() => {
            handleReply(index,replyTxt)
            setIsReply(false)
        }}>Add</button>
        <button onClick={() => setIsReply(false)}>cancel</button>
      </div>}
      {el.replies.map(el=>(
        <div key={el.id} style={{border:'2px solid red'}}>
            <h2>{el.title}</h2>
        </div>
      ))}
    </>
  );
}
