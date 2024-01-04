export const isLogedIn:boolean = Boolean(localStorage.getItem("accessToken")).valueOf()

export const AccessToken: string | null = localStorage.getItem("accessToken")

export const UserData: any = localStorage.getItem("userData")?.length  ? JSON.parse(localStorage.getItem("userData") || "{}") : {}
