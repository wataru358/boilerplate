import React, { useEffect } from "react"
import Router, { useRouter } from "next/router"

let count = 0
const Test = () => {
  const router = useRouter()
  useEffect(() => {
    console.log("hello I am mounted")
    return () => {
      console.log("bye, unmounted")
    }
  })
  return (
    <div key={"testtest"}>
      hello:
      <button
        onClick={() => {
          Router.push(
            {
              pathname: Router.pathname,
              query: { test: count++ },
            },
            undefined,
            {
              shallow: true,
            },
          )
        }}
      >
        click me
      </button>
    </div>
  )
}
export default Test
