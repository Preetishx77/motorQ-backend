import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBlog = createAsyncThunk("post/getBlog", async ({id}) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );
});
export const getBlogs = createAsyncThunk("post/getBlogs", async () => {
    return fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
      res.json()
    );
  });
export const deleteBlog = createAsyncThunk(
  "post/deleteBlog",
  async ({ id }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }
);
export const createBlog = createAsyncThunk(
  "post/createBlog",
  async ({ values }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        body: values.body,
      }),
    }).then((res) => res.json());
  }
);
export const updateBlog = createAsyncThunk(
  "post/updateBlog",
  async ({ id, title, body }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    }).then((res) => res.json());
  }
);

const PostSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    loading: false,
    error: null,
    body: "",
    edit: false,
    posts: [{}]
  },
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit;
      state.body = action.payload.body;
    },
  },
  extraReducers: {
    [getBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [getBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [deleteBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [createBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [createBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [updateBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [updateBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { setEdit } = PostSlice.actions;
export default PostSlice.reducer;