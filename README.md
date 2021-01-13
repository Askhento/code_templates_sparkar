# code_templates_sparkar
This is my snippets for Spark AR

## UTILS.js

- getRand(low, high) - float between low - high
- getRandInt(low, high) - int between low - high. High is excluded.
- getRandBool() - bool with 1:1 ratio
- getRandSign() - get sign +/- with 1:1 ratio
- clamp(val, low, high) - fix value between 
- sawToooth(signal) - triangle wave signal from input progress (0 - 1)
    ```
    1.00 ┤    ╭╮    
    0.75 ┤   ╭╯╰╮   
    0.50 ┤  ╭╯  ╰╮  
    0.25 ┤ ╭╯    ╰╮ 
    0.00 ┼─╯      ╰─ 
    ```
    - fractMod(signal, [mod=1]) - modulo which works for negative values. Default works like fract.
    ```
    1.00 ┼    ╭╮     ╭╮    ╭╮    ╭ 
    0.75 ┤   ╭╯│   ╭─╯│  ╭─╯│   ╭╯ 
    0.50 ┤  ╭╯ │ ╭─╯  │ ╭╯  │ ╭─╯  
    0.25 ┤╭─╯  │╭╯    │╭╯   │╭╯    
    0.00 ┼╯    ╰╯     ╰╯    ╰╯         
    ```


- deStep(signal, edge0, edge1) - short for double ended step. 
    ```
    1.00 ┼   ╭───╮  
    0.00 ┼───╯   ╰─  
    ```
    If edge1 < edge0 it will flip:
    ```
    1.00 ┼───╮   ╭─ 
    0.00 ┤   ╰───╯   
    ```
- deSmoothStep(signal, edge0, edge1, delta, [mode="mid","in","out"]) - same as deStep, except smoothed.
    Default mode is "mid".
    ```
             |<---delta->|     
    1.00 ┼   |           |───────────────────────────╮                
    0.94 ┤   |          ╭╯                           ╰╮               
    0.88 ┤   |         ╭╯                             ╰╮              
    0.81 ┤   |         │                               ╰╮            
    0.75 ┤   |        ╭╯                                ╰╮            
    0.69 ┤   |       ╭╯                                  ╰╮            
    0.63 ┤   |      ╭╯                                    |           
    0.56 ┤   |      │                                     ╰╮          
    0.50 ┤   |     ╭╯                                      ╰╮         
    0.44 ┤   |    ╭|                                        │         
    0.38 ┤   |    │|                                        ╰╮        
    0.31 ┤   |   ╭╯|                                         ╰╮       
    0.25 ┤   |  ╭╯ |                                          │       
    0.19 ┤   | ╭╯  |                                          ╰╮      
    0.13 ┤   |╭╯   |                                           ╰╮     
    0.06 ┤   |╯    |                                            ╰─╮   
    0.00 ┼───╯     |                                              ╰── 
         |<--edge->|
    ```
todo:
~~- minList()~~
~~- maxList()~~
~~- getVertex2MVP2d()~~
~~- rayCastPlane()~~
~~- smallFaceTransform()~~
~~- getPersonEllipseMask()~~
~~- getNormal()~~
~~- rotateUV()~~