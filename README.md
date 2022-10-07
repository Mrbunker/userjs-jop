```sh
pnpm i
pnpm build
```

### todo

- 删减列表

- 演员头像，偷 bus 
  ```html
  <img src="/pics/actress/sl1_a.jpg" title="河北彩花">
  ```
  
- 移动端 样式改动（panel 的阴影、圆角等）

- 更多域名

- lib 弹窗 zindex 

- hook buttons
  ```js 
    const rbu = document.querySelector(`a[href="#magnet-links"]`) as HTMLElement;
    console.log(rbu);
    const rbuRef = useRef<HTMLElement>(rbu);
    rbuRef.current.click();
  ```

