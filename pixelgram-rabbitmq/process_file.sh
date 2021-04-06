if (($# <8))
  then
    echo "Usage : $0 <DOCKER_PROJECT_NAME> <APP_NAME> <IMAGE_TAG> <directory containing k8s files> <TIMESTAMP> <PORT/TARGEt PORT> <POD REPLICA COUNT>"
    exit 1
fi

 

WORK_DIR=$1
APP_NAME=$2
IMAGE=$3
TIMESTAMP=$4
REPLICA=$5
MAX_REPLICA=$6
SERVICE_TYPE=$7
SERVICE_PATH=$8

echo "APP_NAME: $WORK_DIR, APP_NAME: $APP_NAME, IMAGE: $IMAGE, TIMESTAMP: $TIMESTAMP, PORT: $PORT, TARGET_PORT: $TARGET_PORT, CONTAINER_PORT: $CONTAINER_PORT, REPLICA: $REPLICA, MAX_REPLICA: $MAX_REPLICA, SERVICE_TYPE: $SERVICE_TYPE, SERVICE_PATH: $SERVICE_PATH"

main(){
find $WORK_DIR -name "kube.yaml" -type f -exec sed -i.bak1 's#__APP_NAME__#'$APP_NAME'#g' {} \;
find $WORK_DIR -name "kube.yaml" -type f -exec sed -i.bak2 's#__IMAGE__#'$IMAGE'#g' {} \;
find $WORK_DIR -name "kube.yaml" -type f -exec sed -i.bak3 's#__TIMESTAMP__#'$TIMESTAMP'#' {} \;
find $WORK_DIR -name "kube.yaml" -type f -exec sed -i.bak4 's#__PORT__#'$PORT'#' {} \;
find $WORK_DIR -name "kube.yaml" -type f -exec sed -i.bak5 's#__TARGET_PORT__#'$TARGET_PORT'#' {} \;
find $WORK_DIR -name "kube.yaml" -type f -exec sed -i.bak6 's#__CONTAINER_PORT__#'$CONTAINER_PORT'#' {} \;
find $WORK_DIR -name "kube.yaml" -type f -exec sed -i.bak7 's#__REPLICA__#'$REPLICA'#' {} \;
find $WORK_DIR -name "kube.yaml" -type f -exec sed -i.bak8 's#__MAX_REPLICA__#'$MAX_REPLICA'#' {} \;
find $WORK_DIR -name "kube.yaml" -type f -exec sed -i.bak9 's#__SERVICE_TYPE__#'$SERVICE_TYPE'#' {} \;
find $WORK_DIR -name "kube.yaml" -type f -exec sed -i.bak10 's#__SERVICE_PATH__#'$SERVICE_PATH'#' {} \;
}
main