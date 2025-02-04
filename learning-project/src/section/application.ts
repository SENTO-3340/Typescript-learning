export const application=()=>{
    type Engineer={
        name:string;
        role:string;
    }

    type Blogger={
        name:string;
        follower:number;
    }

    type EngineerBlogger=Engineer & Blogger;

    const quill:EngineerBlogger=Engineer={
        name:'Quill',
        role:'front-end',
        follower:1000,
    }

    
}
