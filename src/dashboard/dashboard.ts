import { buildHome } from "./builds/home-build";
import { buildRegisterIntern } from "./builds/register-intern-build";

// Dashboard buttons
const homeButton: any = document.getElementById('home');
const registerInternButton: any = document.getElementById('intern-register');
// const createActivityButton: HTMLElement | null = document.getElementById('create-activity');
// const rankingButton: HTMLElement | null = document.getElementById('ranking');

window.addEventListener('load', buildHome);

homeButton.addEventListener('click', buildHome);

registerInternButton.addEventListener('click', buildRegisterIntern)
