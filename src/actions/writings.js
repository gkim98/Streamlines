import database from '../firebase/firebase';

export const addWriting = (writing) => ({
    type: 'ADD_WRITING',
    writing
});

// adds writing to firebase and redux store
export const startAddWriting = (writingData = {}) => {
    return (dispatch) => {
        const {
            text = '',
            createdAt = ''
        } = writingData;
        const writing = {text, createdAt};

        database.ref('writings').push(writing).then((ref) => {
            dispatch(addWriting({
                id: ref.key,
                ...writing
            }));
        });
    };
};


// retrieves writings from database
export const getWritings = (writings) => ({
    type: 'GET_WRITINGS',
    writings
});

export const startGetWritings = () => {
    return (dispatch) => {
        database.ref('writings').once('value').then((snapshot) => {
            const writings = [];

            // set writings array same as data on firebase
            snapshot.forEach((childSnap) => {
                writings.push({
                    id: childSnap.key,
                    ...childSnap.val()
                });
            });

            dispatch(getWritings(writings));
        })
    };
};