export default function progressPaths(paths_obj_in) {
    const paths_obj = JSON.parse(JSON.stringify(paths_obj_in))

    paths_obj.paths.forEach((path, index) => {
      paths_obj.paths[index] = progressPath(path, paths_obj.directions[index])
    })
    return paths_obj.paths
}

const progressPath = (path_in, direction) => {
  const path = JSON.parse(JSON.stringify(path_in))

  path[0][0] += Math.cos(direction);
  path[0][1] += Math.sin(direction);
  return path
}

