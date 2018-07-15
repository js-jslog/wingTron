export default function progressPaths(paths_in) {
    const paths = JSON.parse(JSON.stringify(paths_in))
    paths.forEach((path, index) => {
      paths[index] = progressPath(path)
    })
    return paths
}

const progressPath = (path_obj_in) => {
  const path_obj = JSON.parse(JSON.stringify(path_obj_in))
  path_obj.path[0][0] += Math.cos(path_obj.direction);
  path_obj.path[0][1] += Math.sin(path_obj.direction);
  return path_obj
}

