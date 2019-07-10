package com.wzlue.chain.sys.util;

import java.util.List;

public class TreeNode {

    /**
     * 节点key
     */
    private Long id;

    /**
     * 父节点key
     */
    private Long parentId;

    /**
     * 节点名称
     */
    private String text;

    /**
     * 父节点名称
     */
    private String parentName;

    private Object node;
    /**
     * 子节点数据
     */
    private List<TreeNode> nodes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<TreeNode> getNodes() {
        return nodes;
    }

    public void setNodes(List<TreeNode> nodes) {
        this.nodes = nodes;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public Object getNode() {
        return node;
    }

    public void setNode(Object node) {
        this.node = node;
    }


    public TreeNode(){

    }

    public TreeNode(Long id, String name, Long parentId, String parentName){
        this.setId(id);
        this.setText(name);
        this.setParentId(parentId);
        this.setParentName(parentName);
    }

    public TreeNode(Long id, String name, Long parentId, String parentName, Object node){
        this.setId(id);
        this.setText(name);
        this.setParentId(parentId);
        this.setParentName(parentName);
        this.setNode(node);
    }

    public TreeNode(Long id, String name, TreeNode parent, Object node){
        this.setId(id);
        this.setText(name);
        this.setParentId(parent.getId());
        this.setParentName(parent.getParentName());
        this.setNode(node);
    }

    public TreeNode(Long id, String name, TreeNode parent){
        this.setId(id);
        this.setText(name);
        this.setParentId(parent.getId());
        this.setParentName(parent.getParentName());
    }
}
