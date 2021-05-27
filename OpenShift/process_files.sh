if (($# <5))
  then
    echo "Usage : $0 <DOCKER_PROJECT_NAME> <APP_NAME> <IMAGE_TAG> <directory containing k8s files> <TIMESTAMP> <PORT/TARGEt PORT> <POD REPLICA COUNT>"
    exit 1
fi

PROJECT_NAME=$1
APP_NAME=$2
IMAGE=$3
WORK_DIR=$4
TIMESTAMP=$5
PORT=$6
REPLICA=$7

main(){
find $WORK_DIR -name "*.yaml" -type f -exec sed -i.bak1 's#__PROJECT_NAME__#'$PROJECT_NAME'#g' {} \;
find $WORK_DIR -name "*.yaml" -type f -exec sed -i.bak2 's#__APP_NAME__#'$APP_NAME'#g' {} \;
find $WORK_DIR -name "*.yaml" -type f -exec sed -i.bak3 's#__IMAGE__#'$IMAGE'#g' {} \;
find $WORK_DIR -name "*.yaml" -type f -exec sed -i.bak4 's#__TIMESTAMP__#'$TIMESTAMP'#' {} \;
find $WORK_DIR -name "*.yaml" -type f -exec sed -i.bak5 's#__PORT__#'$PORT'#' {} \;
find $WORK_DIR -name "*.yaml" -type f -exec sed -i.bak6 's#__TARGET_PORT__#'$PORT'#' {} \;
find $WORK_DIR -name "*.yaml" -type f -exec sed -i.bak7 's#__REPLICA__#'$REPLICA'#' {} \;
}
main