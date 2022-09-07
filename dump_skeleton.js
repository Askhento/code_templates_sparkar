
async function dumpSkeleton(rootNode) { 
    const nodes = await rootNode.findByPath("**");
    {
        // log(some_node.name);
        // nodes.map((node) => log(node.name))    
        const json = {}
        for(let i=0; i < nodes.length; i++)
        {

        const some_node = nodes[i];

        json[some_node.name + "_posX"] = some_node.transform.x.format("{:.10f}")
        json[some_node.name + "_posY"] = some_node.transform.y.format("{:.10f}")
        json[some_node.name + "_posZ"] = some_node.transform.z.format("{:.10f}")
            
        json[some_node.name + "_rotX"] = some_node.transform.rotationX.format("{:.10f}")
        json[some_node.name + "_rotY"] = some_node.transform.rotationY.format("{:.10f}")
        json[some_node.name + "_rotZ"] = some_node.transform.rotationZ.format("{:.10f}")
            
        }            
        R.once().subscribeWithSnapshot(
            json,
            (val, snap) => {
                let data = JSON.stringify(snap);
                let buff = new Buffer(data);
                let base64data = buff.toString('base64');

                log('"' + data + '" converted to Base64 is "' + base64data + '"');

                data = base64data;
                buff = new Buffer(data, 'base64');
                let text = buff.toString('ascii');
                
                log('"' + data + '" converted from Base64 to ASCII is "' + text + '"');                    
            }
        )
    }
}

