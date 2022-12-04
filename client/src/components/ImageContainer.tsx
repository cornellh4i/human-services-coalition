interface imageContainerProp {
    numImages: number
}

function imageContainer (props: imageContainerProp) {
    // props.numImages

    if (props.numImages === 1){
        return (
            <>
            {true ? <p>true </p> : <p>false</p>}
            </>
        )
    }
    else if (props.numImages === 2){
        return (
            <>
            
            </>
        )
    }
    else{

    }
}
export default imageContainer