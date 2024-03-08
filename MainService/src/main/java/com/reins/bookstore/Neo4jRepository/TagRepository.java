package com.reins.bookstore.Neo4jRepository;


import com.reins.bookstore.entity.Tag;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends Neo4jRepository<Tag,Long> {
    Tag findTagByContent(String content);

    Tag findTagById(Long tagId);

    // 相邻
    @Query("MATCH (t:Tag)-[:HAS_SUBCLASS]->(adjacent:Tag) WHERE t.name = $content RETURN adjacent")
    List<Tag> findAdjacentTagsByContent(String content);

    @Query("MATCH (t:Tag)-[:HAS_SUBCLASS*2]->(distant:Tag) WHERE t.name = $content RETURN distant")
    List<Tag> findDistantTagsByContent(String content);

}


