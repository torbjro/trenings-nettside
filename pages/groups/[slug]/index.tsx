import { useRouter } from "next/router";
import { currentUser, getPosts } from "@/pages/api/connects";
import { deleteGroupById, getGroupById } from "@/pages/api/groupsHelpers";
import { useEffect, useState } from "react";
import { Group, Post } from "@/pages/types";
import { Post2 } from "@/components/stories/Post/Post2";
import { Button } from "@chakra-ui/react";

const GroupPage = () => {
    const router = useRouter()
    const { slug } = router.query;

    const [posts, setPosts] = useState<Post[]>();
    const [group, setGroup] = useState<Group>();


    useEffect(() => {
        if (slug) {
            getPosts(slug as string).then((group) => {
                setPosts(group);
            });
        }
    }, [slug]);

    useEffect(() => {
        if (slug) {
            getGroupById(slug as string).then((group) => {
                if (!group) {
                    router.push('/dashboard');
                } else {
                    setGroup(group);
                }
            });
        }
    }, [router, slug]);

    const deleteGroup = () => {
        deleteGroupById(slug as string);
        console.log('delete group');
        router.push('/groups');
    }

    return (
        <>
            <div className='grid justify-center px-20'>
                <div
                className="bg-white shadow-md rounded-lg px-4 py-6 sm:px-6 sm:py-4 lg:px-8 lg:py-6 grid place-items-center gap-2"
                >
                    <h2 className="font-bold text-xl text-violet-600">{group?.name}</h2>
                    <p>{group?.description}</p>
                    {currentUser && group?.admins?.includes(currentUser?.id) ? 
                    <Button 
                    onClick={deleteGroup}
                    className="bg-violet-600 text-white px-4 py-2 rounded-lg"
                    >Delete Group</Button>
                    : ""
                    }
                </div>
                {
                    posts?.map((post) => {
                        return (
                         <div key={post.id} className="py-3">
                                <Post2
                                    post={post}
                                    />
                            </div>
                        )
                    })
                }
            </div>
        </>
      );
};

export default GroupPage;