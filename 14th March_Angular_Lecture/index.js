const angularTeam = [
  {
    id: 1,
    name: "Vansh",
    age: 22,
    projects: ["Portfolio", "Course Web", "Chat Application"],
  },
  {
    id: 2,
    name: "Ankit",
    age: 22,
    projects: ["Portfolio", "Course Web", "Chat Application"],
  },
  {
    id: 3,
    name: "Disha",
    age: 22,
    projects: ["Portfolio", "Course Web", "Chat Application"],
  },
  {
    id: 4,
    name: "Nitanshi",
    age: 22,
    projects: ["Portfolio", "Course Web", "Chat Application"],
  },
];

function fetch() {
  console.log("Fetching data...");

  setTimeout(() => {
    detail(angularTeam);
  }, 2000);
}

function detail(team) {
  console.log("Fetching details...");
  console.log(team);

  setTimeout(() => {
    projectDetail(team[0]);
  }, 2000);
}

function projectDetail(member) {
  console.log("Fetching member detail .....");
  console.log(member);
  console.log("Fetching project details...");
  console.log(member.projects);

  setTimeout(() => {
    numberOfProjects(member.projects.length);
  }, 2000);
}

function numberOfProjects(number) {
  console.log("Count of projects:", number);
  console.log("Total :", number * 100);
}

fetch();
