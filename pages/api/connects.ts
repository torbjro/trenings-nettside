import Pocketbase, { Record } from "pocketbase"

export const pocketbase = new Pocketbase("http://127.0.0.1:8090");

export const currentUser = pocketbase.authStore.model;

export async function authAndReturnUser(username: string, password: string) {
    const user = await pocketbase.collection('users').authWithPassword(username, password);
    return user;
}

export async function registerUser(username: string, email: string, password: string, passwordConfirm: string, name: string) {
    const data = {
        "username": username,
        "email": email,
        "emailVisibility": true,
        "password": password,
        "passwordConfirm": passwordConfirm,
        "name": name,
        "posts": [

        ],
        "programs": [

        ],
        "friends": [

        ]
    };
    const newUser = await pocketbase.collection('users').create(data);
    const user1 = await authAndReturnUser(username, password);
    return newUser;
}

export async function deleteUser(userId: string) {
    await pocketbase.collection('users').delete(userId);
}

export async function createProgram(userId: string, exercises: string[], name: string) {
    const data = {
        "name": name,
        "user": [
            userId
        ],
        "exercises": exercises
    };
    const program = await pocketbase.collection('programs').create(data);
    return program;
}

export async function deleteProgram(programId: string) {
    await pocketbase.collection('programs').delete(programId);
}

export async function createPost(caption: string, programId: string, userId: string) {
    const data = {
        "caption": caption,
        "program": programId,
        "user": userId
    };
    const post = await pocketbase.collection('posts').create(data);
    return post;
}

export async function deletePost(postId: string) {
    await pocketbase.collection('posts').delete(postId);
}

export async function createExercise(exercise: string, sets: number, reps: number) {
    const data = {
        "exercise": exercise,
        "sets": sets,
        "reps": reps
    };
    const newExercise = await pocketbase.collection('exercises').create(data);
}

export async function deleteExercise(exerciseId: string) {
    await pocketbase.collection('exercises').delete(exerciseId);
}

export async function isAuthenticated() {
    return pocketbase.authStore.isValid;
}

export async function logout() {
    pocketbase.authStore.clear();
}

export function getUser() {
    //return pocketbase.authStore.model;
    return pocketbase.authStore.model;
}

export async function getUserId() {
    if (currentUser != null) {
        return currentUser.id;
    }
    else {
        console.log("currentUser is null");
    }
}

export function getUserPosts() {
    pocketbase.autoCancellation(false);
    return pocketbase.collection('posts').getList(1, 20, { filter: `id = '${currentUser?.posts?.join("' || id = '")}'` });
}

export async function getName() {
    if (currentUser != null) {
        return currentUser.name;
    }
    else {
        console.log("currentUser is null");
    }
}

export async function getPosts() {
    // henter alle posts
    pocketbase.autoCancellation(false);
    const posts = await pocketbase.collection("posts").getFullList();
    return posts
}

export interface post_username {
    name: string;
}
export async function getUserById(id: string) {
    const user = await pocketbase.collection("users").getOne(`${id}`);
    return user;
}

export async function getFriends() {
    pocketbase.autoCancellation(false);
    const friends = await pocketbase.collection('users').getList(1, 20, { filter: `id = '${currentUser?.friends?.join("' || id = '")}'` });
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pocketbase.authStore.isValid && await pocketbase.collection('users').authRefresh();
    } catch (_) {
        // clear the auth store on failed refresh
        pocketbase.authStore.clear();
    }

    return friends;
}

export async function getProgramById(id: string) {
    const programs = await pocketbase.collection('programs').getOne(`${id}`);
    return programs;
}

export async function getExercisesByPostId(id: string) {
    // post contains an id to a program, which contains an array of ids to exercises
    const post = await pocketbase.collection('posts').getOne(`${id}`);
    const program = await pocketbase.collection('programs').getOne(`${post?.program}`);
    const exercises = await pocketbase.collection('exercises').getList(1, 20, { filter: `id = '${program?.exercises.join("' || id = '")}'` });
    return exercises;
}

export function getUserAvatar() {
    return currentUser?.avatar;
}
