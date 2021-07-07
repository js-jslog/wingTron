import CollisionDetection from '~/collisionDetection.js'
// TODO: should collision detection be a dependency inside this folder

export default function calculateCollisionMatrix(paths_obj_in) {

  const paths_obj = JSON.parse(JSON.stringify(paths_obj_in))

  const collision_matrix = paths_obj.map(subject_path => (
    paths_obj.map(object_path => (
      intersects(subject_path, object_path)
    ))
  ))

  return collision_matrix
}

const intersects = (path1, path2) => {
  return CollisionDetection.isPointWithinPath(path1[0], path2)
}
