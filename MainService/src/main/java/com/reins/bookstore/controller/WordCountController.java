//package com.reins.bookstore.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class WordCountController {
//
//    @Autowired
//    WordCountService service;
//
//    @GetMapping("/wordcount")
//    public Map<String, Long> count(@RequestParam("path") String path, @RequestParam String[] keyWords) {
//        Map<String, Long> keywordCounts = new HashMap<>();
//        File directory = new File(path);
//
//        // Check if path is a directory and not empty
//        if (!directory.isDirectory() || directory.listFiles() == null) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provided path is not a directory or is empty.");
//        }
//
//        try {
//            Files.walk(Paths.get(path))
//                    .filter(Files::isRegularFile)
//                    .filter(p -> p.toString().endsWith(".txt"))
//                    .forEach(file -> {
//                        // Read and count keywords for each text file
//                        keywordCounts.putAll(readTextFile(file, keyWords, keywordCounts));
//                    });
//        } catch (IOException e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while processing the files.");
//        }
//
//        return keywordCounts;
//    }
//
//    private Map<String, Long> readTextFile(Path path, String[] keyWords, Map<String, Long> keywordCounts) {
//        Map<String, Long> fileKeywordCounts = new HashMap<>();
//
//        try (BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
//            String content = reader.lines().collect(Collectors.joining("\n"));
//
//            // Tokenize the content of the text file
//            List<String> words = Arrays.asList(content.split("\\s+"));
//
//            // Update keywordCounts with the counts of each keyword
//            for (String keyword : keyWords) {
//                long count = words.stream().filter(word -> word.equalsIgnoreCase(keyword)).count();
//                fileKeywordCounts.put(keyword, fileKeywordCounts.getOrDefault(keyword, 0L) + count);
//            }
//
//            // Merge current file keyword counts to total counts
//            fileKeywordCounts.forEach((key, value) -> keywordCounts.merge(key, value, Long::sum));
//
//        } catch (IOException e) {
//            // Log and ignore the file if there's an error reading it
//            System.err.println("Error reading file " + path + ": " + e.getMessage());
//        }
//
//        return keywordCounts;
//    }
//}