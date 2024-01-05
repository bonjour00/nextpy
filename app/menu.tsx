"use client";
import { AppBar, Avatar, Button, Toolbar } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import app from "@/app/_firebase/Config";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handelUser } from "../redux/features/authSlice";

export default function MenuTool() {
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuth(app);
  // const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  const login = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleAuthProvider); //登入
  };
  const user = useAppSelector((state) => state.auth);
  const logout = async () => {
    await signOut(auth);
  };
  useEffect(() => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const data = {
          email: currentUser.email,
          url: currentUser.photoURL,
          name: currentUser.displayName,
          uid: currentUser.uid,
        };
        dispatch(handelUser(data));
      } else {
        dispatch(
          handelUser({
            email: "",
            url: "",
            name: "",
            uid: "",
          })
        );
      }
    });
    console.log(user);
    return () => {
      unsub();
    };
  }, []);
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#A4D4D5" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button
              style={{
                color: "black",
                background: pathname === "/" ? "white" : "",
              }}
              onClick={() => router.push("/")}
              sx={{
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              首頁
            </Button>
            <Button
              style={{
                color: "black",
                background: pathname === "/language" ? "white" : "",
              }}
              onClick={() => router.push("/language")}
              sx={{
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              語言
            </Button>
            <Button
              style={{
                color: "black",
                background: pathname === "/programming" ? "white" : "",
              }}
              onClick={() => router.push("/programming")}
              sx={{
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              程式
            </Button>
            <Button
              style={{
                color: "black",
                background:
                  pathname === "/finance-and-investment" ? "white" : "",
              }}
              onClick={() => router.push("/finance-and-investment")}
              sx={{
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              投資理財
            </Button>
            {user.user.uid && (
              <>
                <Button
                  style={{
                    color: "black",
                    background: pathname === "/articles" ? "white" : "",
                  }}
                  onClick={() => router.push("/articles")}
                  sx={{
                    "&:hover": {
                      bgcolor: "white",
                    },
                  }}
                >
                  我的文章
                </Button>
                <Button
                  style={{
                    color: "black",
                    background: pathname === "/chat" ? "white" : "",
                  }}
                  onClick={() => router.push("/chat")}
                  sx={{
                    "&:hover": {
                      bgcolor: "white",
                    },
                  }}
                >
                  問答區
                </Button>
              </>
            )}
          </div>
          <Dropdown>
            <MenuButton>
              <Avatar
                alt={user.user.url || undefined}
                src={user.user.url || undefined}
              />
            </MenuButton>
            <Menu>
              <MenuItem onClick={login}>登入</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Dropdown>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
