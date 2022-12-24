import { useRouter } from 'next/router'
import { Cid } from "../../containers/cid"

const Post = () => {
  const router = useRouter()
  const { cid } = router.query

  return (
    <div className="bg-grey-1">
    <div className="w-full m-auto gap-3 min-h-screen py-2">
      <Cid/>
    </div>
  </div>
   )
}

export default Post