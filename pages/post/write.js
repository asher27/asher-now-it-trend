import React, { useRef, useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import {tr} from "date-fns/locale";

export default function Write() {
  const idRef = useRef(undefined);
  const titleRef = useRef(undefined);
  const contentRef = useRef(undefined);

  const [showLink, setShowLink] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          title,
          content
        })
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Fetch Error');
        })
        .then((data) => {
          setShowLink(true);
          alert(data.message)
        })
        .catch((error) => alert(`request error: ${error}`));
    }
  };

  return (
    <Layout>
      <h1>Write a Post</h1>

      <form onSubmit={handleSubmit}>
        <input type={'text'} name={'id'} placeholder={'id'} required={true} ref={idRef} />
        <br />
        <input type={'text'} name={'title'} placeholder={'title'} required={true} ref={titleRef} />
        <br />

        <textarea name={'content'} placeholder={'content'} required={true} ref={contentRef} />

        <br />
        <input type={'submit'} value={'Create'} />
      </form>

      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>
          <a>Created Post</a>
        </Link>
      )}
    </Layout>
  );
}
