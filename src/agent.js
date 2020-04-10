import axios from "axios";

const API_ROOT = process.env.REACT_APP_API_URL

const requests = {
  get: url =>
  {
    console.log("GET: "+url)
    return  axios.get(`${API_ROOT}${url}`).then(res => res.data.results)
  }
};


const Posts = {
  get: (subreddit, page) =>
    requests.get("subreddit/"+subreddit+"?page="+page),
  getSingle: (subreddit, id) =>
    requests.get("subreddit/"+subreddit+"?id="+id)
};

const Categories = {
  get: () => requests.get("category/")
};


export default {Posts, Categories}
