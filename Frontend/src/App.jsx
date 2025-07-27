import { useState,useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from 'react-simple-code-editor'
import prism from "prismjs"
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkGfm from 'remark-gfm';


import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";

import './App.css'

// Place the console.log here (outside the component)
console.log("Prism.languages.javascript = ", prism.languages.javascript);

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`function sum(){
   return 1+ 1;
 } `)

 const [review,setReview] = useState(``)



async function reviewCode() {
  try {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });
    console.log("Review response:", response.data);

    // Handle different response formats
    if (typeof response.data === 'string') {
      setReview(response.data);
    } else if (response.data?.message && typeof response.data.message === 'string') {
      setReview(response.data.message);
    } else {
      setReview("**⚠️ Unexpected response format.**");
    }

  } catch (error) {
    console.error("Error fetching review:", error);
    setReview("**❌ Error fetching review. Please try again later.**");
  }
}


  return (
    <>
      <main>
        <div className = "left">
          <div className ="code">
            
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                
                width: "100%",
                
                
              
              }}
            />
          </div>
          <div onClick = {reviewCode} className = "review" >Review</div>
        </div>
              <div className="right">
                {typeof review === 'string' && review.trim() !== '' ? (
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                    {review}
                </Markdown>

  ) : (
    <p>No review yet</p>
  )}
</div>


      </main>
    </>
  )
}

export default App
