import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/chat/:chatId"],
});


export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)',
        '/(api|trpc|companion)(.*)'
    ]
}