import { useState, useEffect, useMemo } from "react";
import { useRouter } from 'next/router';
import { isArray, isEmpty } from "lodash";



import Posts from '../src/components/post';
import Pagination from '../src/components/pagination';
import { handleGetAllUnique, cleanObj, updateData } from '../utils/services';
import { postData } from "../utils/middleware";

import Topbar from "../src/components/topbar";
import Filterbar from "../src/components/filterbar.js";
import Sortbar from "../src/components/sortbar";
import Loader from "../src/components/loader";

export default function Home() {
  const router = useRouter()
  const [posts, setPosts] = useState([]);
  const [allposts, setallposts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionTypeSelector, setActionTypeSelector] = useState([])
  const [applicationTypeSelector, setApplicationTypeSelector] = useState([])
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const query = {
      ...router.query,
    }
    if (router.isReady) {
      fetchPosts(query);
    }
  }, [router.isReady, router]);


  const fetchPosts = async (query) => {
    try {
      const res = await postData()
      console.log(res)
      if (res.success) {
        setallposts(res.result.auditLog)
        const updatequery = await updateData(cleanObj(query), res.result.auditLog)
        setPosts(updatequery)
        setActionTypeSelector(handleGetAllUnique(res.result.auditLog, 'actionType'))
        setApplicationTypeSelector(handleGetAllUnique(res.result.auditLog, 'applicationType'))
      }

    } catch (error) {
      console.log(error);
    }


  };


  const firstPageIndex = (currentPage - 1) * postsPerPage;
  const lastPageIndex = firstPageIndex + postsPerPage;
  const currentTableData = posts.slice(firstPageIndex, lastPageIndex);

  return (
    <>
      <main>
        <h3>Deploy</h3>
        <Topbar />
        <Filterbar actionTypeSelector={actionTypeSelector} applicationTypeSelector={applicationTypeSelector} />
        <div className="table">
          <Sortbar handlePost={data => setPosts(data)} allposts={allposts} />
          {!isEmpty(currentTableData) && isArray(currentTableData) ?
            <>
              <Posts posts={currentTableData} />
              <Pagination
                pageSize={postsPerPage}
                totalCount={posts.length}
                currentPage={currentPage}
                paginate={page => setCurrentPage(page)}
              />
            </>
            : (
              <>
                {
                  <Loader />
                }
              </>
            )}
        </div>
      </main>
    </>
  )
}
