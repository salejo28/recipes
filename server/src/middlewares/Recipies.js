import fs from 'fs';
import { v4 } from 'uuid';
import config from '../config/config';
import { formatDate } from '../utils/utils';

export async function GetRecipies() {
  const json_recipies = await fs.readFileSync(config.DB.RECIPIES, 'utf-8');
  let recipies = JSON.parse(json_recipies);
  const json_users = await fs.readFileSync(config.DB.USERS, 'utf-8');
  let users = JSON.parse(json_users);
  recipies.forEach((recipe) => {
    recipe.email = users.find((user) => user.id === recipe.user_id).email;
  });
  return recipies.sort(
    (a, b) =>
      new Date(b.date_created_or_updated) - new Date(a.date_created_or_updated),
  );
}

export async function GetRecipie(rid) {
  const json_recipies = await fs.readFileSync(config.DB.RECIPIES, 'utf-8');
  let recipies = JSON.parse(json_recipies);
  const recipie = recipies.find((recipie) => recipie.id === rid);
  if (recipie === undefined) {
    return {
      success: false,
      error: 'Recipie does not exist!',
    };
  }

  return {
    success: true,
    recipie,
  };
}

export async function GetRecipiesByUser(uid) {
  const json_recipies = await fs.readFileSync(config.DB.RECIPIES, 'utf-8');
  let recipies = JSON.parse(json_recipies);
  const recipiesByUser = recipies.filter((recipie) => recipie.user_id === uid);
  return recipiesByUser.sort(
    (a, b) =>
      new Date(b.date_created_or_updated) - new Date(a.date_created_or_updated),
  );
}

export async function GetTopTenRecipies() {
  const json_recipies = await fs.readFileSync(config.DB.RECIPIES, 'utf-8');
  let recipies = JSON.parse(json_recipies);
  return recipies.sort((a, b) => a - b).slice(0, 10);
}

export async function Comment(data, rid) {
  const json_recipies = await fs.readFileSync(config.DB.RECIPIES, 'utf-8');
  let recipies = JSON.parse(json_recipies);
  const index = recipies.indexOf((recipie) => recipie.id === rid);
  const recipie = recipies.find((recipie) => recipie.id === rid);
  if (recipie === undefined) {
    return {
      success: false,
      error: 'Recipie does not exist!',
    };
  }
  const newComment = {
    id: v4(),
    ...data,
    response: {},
    date_time: formatDate(new Date()),
  };
  recipie.comments.push(newComment);
  recipies[index] = recipie;
  await fs.writeFileSync(config.DB.RECIPIES, JSON.stringify(recipies), 'utf-8');
  return {
    success: true,
    message: 'Commented!',
  };
}

export async function ResponseComment(data, rid, cid) {
  const json_recipies = await fs.readFileSync(config.DB.RECIPIES, 'utf-8');
  let recipies = JSON.parse(json_recipies);
  const indexRecipie = recipies.indexOf((recipie) => recipie.id === rid);
  const recipie = recipies.find((recipie) => recipie.id === rid);
  if (recipie === undefined) {
    return {
      success: false,
      error: 'Recipie does not exist!',
    };
  }
  const indexComment = recipie.comments.indexOf(
    (comment) => comment.id === cid,
  );
  const comment = recipie.comments.find((comment) => comment.id === cid);
  comment.response = {
    ...data,
    date_time: formatDate(new Date()),
  };

  recipie.comments[indexComment] = comment;
  recipies[indexRecipie] = recipie;
  await fs.writeFileSync(config.DB.RECIPIES, JSON.stringify(recipies), 'utf-8');
  return {
    success: true,
    message: 'Answered!',
  };
}

export async function Qualify(data, rid) {
  const json_recipies = await fs.readFileSync(config.DB.RECIPIES, 'utf-8');
  let recipies = JSON.parse(json_recipies);
  const indexRecipie = recipies.indexOf((recipie) => recipie.id === rid);
  const recipie = recipies.find((recipie) => recipie.id === rid);
  if (recipie === undefined) {
    return {
      success: false,
      error: 'Recipie does not exist!',
    };
  }

  recipie.stars.push(data.qualification);
  let sum_stars = 0;
  recipie.stars.forEach((star) => {
    sum_stars += star;
  });
  const num_votes = recipie.stars.length;
  const max_possible = 5 * num_votes;
  recipie.qualification = (5 * sum_stars) / max_possible;
  recipies[indexRecipie] = recipie;
  await fs.writeFileSync(config.DB.RECIPIES, JSON.stringify(recipies), 'utf-8');
  return {
    success: true,
    message: 'Qualified!',
  };
}

export async function CreateRecipie(data, uid) {
  const json_recipies = await fs.readFileSync(config.DB.RECIPIES, 'utf-8');
  let recipies = JSON.parse(json_recipies);
  let existRecipie = recipies.find((recipie) => recipie.title === data.title);
  if (existRecipie !== undefined) {
    return {
      success: false,
      error: 'Recipie is already exist!',
    };
  }

  const newRecipie = {
    id: v4(),
    ...data,
    user_id: uid,
    date_created_or_updated: formatDate(new Date()),
    comments: [],
    stars: [],
    qualification: 0,
  };
  recipies.push(newRecipie);
  await fs.writeFileSync(config.DB.RECIPIES, JSON.stringify(recipies), 'utf-8');
  return {
    success: true,
    message: 'Recipie created!',
  };
}

export async function UpdateRecipie(data, rid) {
  const json_recipies = await fs.readFileSync(config.DB.RECIPIES, 'utf-8');
  let recipies = JSON.parse(json_recipies);
  const index = recipies.indexOf((recipie) => recipie.id === rid);
  const recipie = recipies.find((recipie) => recipie.id === rid);
  if (recipie === undefined) {
    return {
      success: false,
      error: 'Recipie does not exist!',
    };
  }
  const { title, description, preparation, ingredients, images } = data;
  recipie.title = title;
  recipie.description = description;
  recipie.preparation = preparation;
  recipie.ingredients = ingredients;
  recipie.images = images;
  recipie.date_created_or_updated = formatDate(new Date());
  recipies[index] = recipie;
  await fs.writeFileSync(config.DB.RECIPIES, JSON.stringify(recipies), 'utf-8');
  return {
    success: true,
    message: 'Recipie updated successfully!',
  };
}

export async function DeleteRecipie(rid) {
  const json_recipies = await fs.readFileSync(config.DB.RECIPIES, 'utf-8');
  let recipies = JSON.parse(json_recipies);
  recipies = recipies.filter((recipie) => recipie.id !== rid);
  await fs.writeFileSync(config.DB.RECIPIES, JSON.stringify(recipies), 'utf-8');
}
