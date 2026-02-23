const user = {
    email: "tigerkev07@gmail.com",
    password: "12345678",
    status: "active",
}
for(const item in user){
    console.log(item + ": " + user[item]);
}