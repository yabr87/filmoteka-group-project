import { refs } from './refs';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';
import Notiflix from 'notiflix';
import { renderBtn } from './render/renderAuthBtns';
import { listeners } from 'process';
import { libraryFetch, makeLogInError } from './markup/libraryMarkup';

const firebaseConfig = {
  apiKey: 'AIzaSyBakZQ7NSRmE_SAmTsvnOPb_I7LECSfEIo',
  authDomain: 'filmoteka-7f68b.firebaseapp.com',
  databaseURL:
    'https://filmoteka-7f68b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-7f68b',
  storageBucket: 'filmoteka-7f68b.appspot.com',
  messagingSenderId: '577857537349',
  appId: '1:577857537349:web:7474e021424440c5f0aa2c',
  measurementId: 'G-8D9CEGKJYV',
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth();

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

const updateUserData = async (id, type, userId) => {
  const db = getDatabase();

  try {
    await update(ref(db, 'users/' + userId), {
      [type]: [id],
    });
    Notiflix.Notify.info(
      `Film has been added to your ${type} list`,
      refs.mesageOption
    );
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong', refs.mesageOption);
  }
};

const toggleUserData = async (id, arr, type, userId) => {
  let idsArr = [];
  idsArr = arr[type];

  if (idsArr.includes(id)) {
    const filteredIds = idsArr.filter(filmId => filmId != id);
    const db = getDatabase();

    try {
      await update(ref(db, 'users/' + userId), {
        [type]: filteredIds,
      });
      Notiflix.Notify.failure(
        `Film has been removed from your ${type} list`,
        refs.mesageOption
      );
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure('Something went wrong', refs.mesageOption);
    }
  } else {
    idsArr.push(id);

    const db = getDatabase();
    await update(ref(db, 'users/' + userId), {
      [type]: idsArr,
    });
    Notiflix.Notify.info(
      `Film has been added to your ${type} list`,
      refs.mesageOption
    );
  }
};

const createUserData = async (id, type, userId) => {
  const db = getDatabase();

  try {
    await set(ref(db, 'users/' + userId), {
      [type]: [id],
    });
    Notiflix.Notify.info(
      `Film has been added to your ${type} list`,
      refs.mesageOption
    );
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong', refs.mesageOption);
  }
};

// Розлогінитись

export const logOut = async () => {
  await signOut(auth);
  Notiflix.Notify.info("You've been signed out", refs.mesageOption);
};

// Залогінитись

export const authentificate = async () => {
  try {
    await signInWithPopup(auth, provider);
    renderBtn(true);
    Notiflix.Notify.success('You succesfully logged in', refs.mesageOption);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong', refs.mesageOption);
  }
};

// Обробляє айді та тип (watched/queue), куди треба їх записати
// Якщо такого типу немає - створює новий
// Якщо викликати на тому айді, який вже є в БД - видаляє його звідти
// Якщо в БД взагалі немає запису - створює новий

export const manageUserData = (id, type) => {
  getCurrentUser().then(r => {
    const uid = r.uid;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`))
      .then(snapshot => {
        if (snapshot.exists() && !snapshot.val()[type]) {
          updateUserData(id, type, uid);
        }
        if (snapshot.exists() && snapshot.val()[type]) {
          toggleUserData(id, snapshot.val(), type, uid);
        }
        if (!snapshot.exists()) {
          createUserData(id, type, uid);
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
};

// Отримати проміс з айдішніками з бекенду
// Якщо айдішніків немає - прилітає null
// Якщо айдішніки є - прилітають в вигляді обʼєкту
// {
//   watched: [someId]
//   queue: [someId]
// }

export const getUserData = async () => {
  return getCurrentUser().then(async r => {
    if (!r) {
      return;
    }

    const uid = r.uid;

    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, `users/${uid}`));
      if (snapshot.val() === null) {
        return null;
      } else {
        return snapshot.val();
      }
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure('Something went wrong', refs.mesageOption);
    }
  });
};

const handleAuthClick = async e => {
  if (e.target.dataset.type === 'sign-in') {
    await authentificate();
    if (document.body.dataset.page && document.body.dataset.page === 'Queue') {
      libraryFetch('Queue');
    }
    if (
      document.body.dataset.page &&
      document.body.dataset.page === 'Watched'
    ) {
      libraryFetch('Watched');
    }
  }
  if (e.target.dataset.type === 'log-out') {
    logOut();
    renderBtn(false);
    if (document.body.dataset.page && document.body.dataset.page === 'Queue') {
      makeLogInError();
    }
    if (
      document.body.dataset.page &&
      document.body.dataset.page === 'Watched'
    ) {
      makeLogInError();
    }
  }
};

export const MakeAuthBtn = () => {
  getCurrentUser(auth).then(r => {
    renderBtn(r);
    refs.authBtnWrap.addEventListener('click', handleAuthClick);
  });
};
