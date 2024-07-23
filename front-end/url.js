let url = ""
if(import.meta.env.PROD){
    url = "https://flock-space-server.vercel.app"
}else{
    url = "http://localhost:5000"
}

export default url