import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to log in
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // 1) Hit the login endpoint (sets cookie if valid)
      const resp = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important to receive the cookie
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.message || "Login failed");
      }

      // 2) Now that cookie is set, fetch profile to get user data
      const profileResp = await fetch("http://localhost:5000/api/auth/profile", {
        credentials: "include",
      });
      if (!profileResp.ok) {
        throw new Error("Failed to fetch profile");
      }
      const userData = await profileResp.json();

      return userData; // This becomes the payload in fulfilled
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to log out
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await fetch("http://localhost:5000/api/auth/logout", {
    credentials: "include",
  });
  return null; // payload
});

// Fetch user profile from cookie-based session
export const fetchUserProfileThunk = createAsyncThunk(
    "auth/fetchProfile",
    async (_, { rejectWithValue }) => {
      try {
        const resp = await fetch("http://localhost:5000/api/auth/profile", {
          credentials: "include", // important to include session cookie
        });
        if (!resp.ok) {
          // e.g. 401 if not logged in, or 500
          throw new Error("Failed to fetch profile");
        }
        const userData = await resp.json();
        return userData; // => action.payload in fulfilled
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // userData from above
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      })

      // FETCH PROFILE
      .addCase(fetchUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        // If fetch fails (e.g. not logged in), we can set user to null
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
