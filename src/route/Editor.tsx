import React, {useState} from 'react';
import {Editor, setSchemaTpl, ShortcutKey} from 'amis-editor';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router-dom';
import {toast, Select} from 'amis';
import {currentLocale} from 'i18n-runtime';
import {Icon} from '../icons/index';
import '../editor/DisabledEditorPlugin'; // 用于隐藏一些不需要的Editor预置组件
import '../renderer/MyRenderer';
import '../editor/MyRenderer';
import {types} from "mobx-state-tree";
import {InputJSONSchemaObject} from "amis-ui/lib/components/json-schema/Object";

let currentIndex = -1;

let host = `${window.location.protocol}//${window.location.host}`;

// 如果在 gh-pages 里面
if (/^\/amis-editor-demo/.test(window.location.pathname)) {
  host += '/amis-editor';
}

const schemaUrl = `${host}/schema.json`;

// const editorLanguages = [
//   {
//     label: '简体中文',
//     value: 'zh-CN'
//   },
//   {
//     label: 'English',
//     value: 'en-US'
//   }
// ];

export default inject()(
  observer(function ({
    match
  }: {} & RouteComponentProps<{id: string}>) {
    const curLanguage = currentLocale(); // 获取当前语料类型
    // @ts-ignore
    let defaultSchema:any = AMIS_JSON;
    const [isMobile,setIsMobile] = useState(false);
    const [preview,setPreview] = useState(false);
    const [schema,setSchema] = useState(defaultSchema);

    const id = match.params.id;
    function save() {
      toast.success('保存成功', '提示');
      updateSchema(schema)
    }

    function onChange(value: any) {
      setSchema(value);
      //updateSchema(value)
    }

    // function changeLocale(value: string) {
    //   localStorage.setItem('suda-i18n-locale', value);
    //   window.location.reload();
    // }

    function updateSchema(value:any){
      console.info("保存",id,value);

      // @ts-ignore
      EDITOR_SAVE(value);
    }

    function exit() {
      // if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1) {
      //   window.location.href = 'about:blank'
      //   window.close()
      // } else {
      //   window.opener = null
      //   window.open('', '_self')
      //   window.close()
      // }
      //history.push(`/${store.pages[index].path}`);
      window.close();
    }

    return (
      <div className="Editor-Demo">
        <div className="Editor-header">
          <div className="Editor-title">amis 可视化编辑器</div>
          <div className="Editor-view-mode-group-container">
            <div className="Editor-view-mode-group">
              <div
                className={`Editor-view-mode-btn editor-header-icon ${
                  !isMobile ? 'is-active' : ''
                }`}
                onClick={() => {
                  setIsMobile(false)
                }}
              >
                <Icon icon="pc-preview" title="PC模式" />
              </div>
              <div
                className={`Editor-view-mode-btn editor-header-icon ${
                  isMobile ? 'is-active' : ''
                }`}
                onClick={() => {
                  setIsMobile(true)
                }}
              >
                <Icon icon="h5-preview" title="移动模式" />
              </div>
            </div>
          </div>

          <div className="Editor-header-actions">
            <ShortcutKey />
            {/*<Select*/}
            {/*  className="margin-left-space"*/}
            {/*  options={editorLanguages}*/}
            {/*  value={curLanguage}*/}
            {/*  clearable={false}*/}
            {/*  onChange={(e: any) => changeLocale(e.value)}*/}
            {/*/>*/}
            <div
              className={`header-action-btn m-1 ${
                preview ? 'primary' : ''
              }`}
              onClick={() => {
                setPreview(!preview);
              }}
            >
              {preview ? '编辑' : '预览'}
            </div>
            {!preview && (
              <div className={`header-action-btn`} onClick={save}>
                保存
              </div>
            )}

            {!preview && (
              <div className={`header-action-btn exit-btn`} onClick={exit}>
                退出
              </div>
            )}
          </div>
        </div>
        <div className="Editor-inner">
          <Editor
            theme={'cxd'}
            preview={preview}
            isMobile={isMobile}
            value={schema}
            onChange={onChange}
            onPreview={() => {
              setPreview(true);
            }}
            onSave={save}
            className="is-fixed"
            $schemaUrl={schemaUrl}
            showCustomRenderersPanel={true}
          />
        </div>
      </div>
    );
  })
);
