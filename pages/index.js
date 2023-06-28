import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import Link from "next/link";
import Date from '../components/Date';

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/posts');
  const { allPostsData } = await response.json();
  return {
    props: {
      allPostsData
    }
  };
}

export default function Home({ allPostsData }) {
  // const [allPostsData, setAllPostsData] = useState([]);
  // useEffect(() => {
  //   fetch('/api/posts')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllPostsData(data.allPostsData);
  //     });
  // }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi 👋, there~, want to be Full-Stack developer && Strategic planner</p>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
